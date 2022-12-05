using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;
using CsvHelper.Configuration.Attributes;

namespace WebApi.Database;

public class Data
{
    [Name("Payment ID")] public int PaymentId { get; set; }
    [Name("Account Holder")] public string AccountHolder { get; set; }
    [Name("Branch Code")] public string BranchCode { get; set; }
    [Name("Account Number")] public string AccountNumber { get; set; }
    [Name("Account Type")] public string AccountType { get; set; }
    [Name("Transaction Date")] public string? TransactionDate { get; set; }
    [Name("Amount")] public double Amount { get; set; }
    [Name("Status")] public string Status { get; set; }
    [Name("Effective Status Date")] public string? EffectiveStatusDate { get; set; }
}

public sealed class DataMap : ClassMap<Data>
{
    public DataMap()
    {
        Map(m => m.PaymentId).Name("Payment ID");
        Map(m => m.AccountHolder).Name("Account Holder");
        Map(m => m.BranchCode).Name("Branch Code");
        Map(m => m.AccountNumber).Name("Account Number");
        Map(m => m.AccountType).Name("Account Type");
        Map(m => m.TransactionDate).Name("Transaction Date");
        Map(m => m.Amount).Name("Amount");
        Map(m => m.Status).Name("Status");
        Map(m => m.EffectiveStatusDate).Name("Effective Status Date");
    }
}