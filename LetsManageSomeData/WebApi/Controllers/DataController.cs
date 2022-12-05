using Microsoft.AspNetCore.Mvc;
using System;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Text;
using System.Text.Json;
using CsvHelper;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic.FileIO;
using WebApi.Database;
using WebApi.Reports;
using iTextSharp.text;

namespace WebApi.Controllers;

public class DataController : ControllerBase
{
    private readonly DataContext _context;

    public DataController(DataContext context)
    {
        _context = context;
    }

    //Handle file upload and read the data
    [HttpPost]
    [Route("upload")]
    public IActionResult Upload([FromForm] IFormFile file)
    {
        var stream = file.OpenReadStream();
        using var reader = new StreamReader(stream, Encoding.Default);
        using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
        var records = csv.GetRecords<Data>();
        var data = records.ToList();
        foreach (var line in data)
        {
            // find the account
            var account = _context.Accounts?.FirstOrDefault(a => a.AccountNumber == line.AccountNumber);
            if (account == null)
            {
                var newAccount = new Account
                {
                    AccountHolder = line.AccountHolder,
                    AccountNumber = line.AccountNumber,
                    AccountType = Utils.GetAccountType(line.AccountType),
                    BranchCode = line.BranchCode,
                };
                _context.Accounts?.Add(newAccount);
                _context.SaveChanges();
                account = newAccount;
            }

            var transactionDate = Utils.ParseDate(line.TransactionDate);
            var effectiveStatusDate = Utils.ParseDate(line.EffectiveStatusDate);

            var timeBreached = Utils.IsTimeBreached(transactionDate, effectiveStatusDate);
            var transaction = new Transaction
            {
                Account = account,
                PaymentId = line.PaymentId,
                Amount = line.Amount,
                Status = Utils.GetTransactionStatus(line.Status),
                TimeBreached = timeBreached,
                EffectiveStatusDate = effectiveStatusDate,
                TransactionDate = transactionDate,
            };
            _context.Transactions?.Add(transaction);
        }

        _context.SaveChanges();

        return Ok();
    }

    //Get all Accounts
    [HttpGet]
    [Route("accounts")]
    public IActionResult GetAccounts()
    {
        var accounts = _context.Accounts
            ?.Select(a => new
            {
                AccountHolder = a.AccountHolder,
                AccountNumber = a.AccountNumber,
                AccountType = a.AccountType.ToString(),
                BranchCode = a.BranchCode
            }).OrderBy(a => a.AccountHolder).ThenBy(a => a.BranchCode).ToList();
        return Ok(accounts);
    }

    //Get all Transactions
    [HttpGet]
    [Route("transactions/")]
    public IActionResult GetTransactions()
    {
        var transactions = _context.Transactions
            ?.Include(o => o.Account)
            .Select(t => new
            {
                PaymentId = t.PaymentId,
                Account = t.Account,
                Amount = t.Amount,
                Status = t.Status.ToString(),
                EffectiveStatusDate = t.EffectiveStatusDate,
                TransactionDate = t.TransactionDate,
                TimeBreached = t.TimeBreached
            })
            .ToList();
        return Ok(transactions);
    }

    [HttpGet]
    [Route("transactions/{accountNumber}")]
    public IActionResult GetTransactionsByAccountNumber(string accountNumber)
    {
        var transactions = _context.Transactions
            ?.Where(t => t.Account.AccountNumber == accountNumber)
            .Include(o => o.Account)
            .Select(t => new
            {
                PaymentId = t.PaymentId,
                Account = t.Account,
                Amount = t.Amount,
                Status = t.Status.ToString(),
                EffectiveStatusDate = t.EffectiveStatusDate,
                TransactionDate = t.TransactionDate,
                TimeBreached = t.TimeBreached
            })
            .ToList();
        return Ok(transactions);
    }

    [HttpGet]
    [Route("report")]
    public IActionResult GetReport()
    {
        var report = TransactionReports.GroupAndSummarizeTransactions(_context.Transactions.Include(o => o.Account));
        return Ok(report);
    }

    [HttpGet]
    [Route("report/download/csv")]
    public IActionResult DownloadReportExcel()
    {
        var report = TransactionReports.GroupAndSummarizeTransactions(_context.Transactions.Include(o => o.Account));

        using var stream = new MemoryStream();
        try
        {
            using var writer = new StreamWriter(stream);
            using var csv = new CsvWriter(writer, CultureInfo.InvariantCulture);
            csv.WriteRecords(report);
            writer.Flush();
            stream.Position = 0;

            // Check if the stream is still readable before returning the file
            if (stream.CanRead)
            {
                return File(stream, "text/csv", "report.csv");
            }
            else
            {
                // Handle the case where the stream is no longer readable
                // For example, you could return a different result or throw an exception
                return BadRequest("The stream is no longer readable");
            }
        }
        catch (Exception ex)
        {
            // Handle any exceptions that occurred while trying to generate the report
            // For example, you could log the error or return a different result
            return BadRequest("An error occurred while generating the report: " + ex.Message);
        }
    }




    [HttpGet]
    [Route("accounts/types")]
    public IActionResult GetAccountTypes()
    {
        // Get all available account types
        var accountTypes = Enum.GetValues(typeof(Utils.AccountType)).Cast<Utils.AccountType>();
        //as strings
        var accountTypesString = accountTypes.Select(a => a.ToString());
        // Return the account types
        return Ok(accountTypesString);
    }

    [HttpGet]
    [Route("accounts/{accountNumber}")]
    public IActionResult GetAccount(string accountNumber)
    {
        // Find the account with the specified account number
        var account = _context.Accounts?.FirstOrDefault(a => a.AccountNumber == accountNumber);
        if (account == null)
        {
            return NotFound();
        }

        // Return the account data
        return Ok(new
        {
            AccountHolder = account.AccountHolder,
            AccountNumber = account.AccountNumber,
            AccountType = account.AccountType.ToString(),
            BranchCode = account.BranchCode
        });
    }


    [HttpPut]
    [Route("accounts/{accountNumber}")]
    public IActionResult EditAccount(string accountNumber, [FromBody] Models.AccountUpdate data)
    {
        // Get the accountType property from the request body
        var accountType = data.accountType;
        if (string.IsNullOrEmpty(accountType))
        {
            // If the property is not present or is an empty string, return a BadRequest response
            return BadRequest();
        }

        // Find the account with the specified account number
        var account = _context.Accounts?.FirstOrDefault(a => a.AccountNumber == accountNumber);
        if (account == null)
        {
            return NotFound();
        }

        // Update the account type
        account.AccountType = Utils.GetAccountTypeFromName(accountType);

        // Save the changes to the database
        _context.SaveChanges();

        // Return the updated account data
        return Ok(new
        {
            AccountHolder = account.AccountHolder,
            AccountNumber = account.AccountNumber,
            AccountType = account.AccountType.ToString(),
            BranchCode = account.BranchCode
        });
    }
}