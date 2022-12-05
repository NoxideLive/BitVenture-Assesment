using WebApi.Database;

namespace WebApi.Reports;

public class TransactionReports
{
    public class TransactionSummary
    {
        public string BranchCode { get; set; }
        public string AccountType { get; set; }
        public string Status { get; set; }
        public double AmountSum { get; set; }
        public int PaymentCount { get; set; }
    }

    public static IEnumerable<TransactionSummary> GroupAndSummarizeTransactions(IEnumerable<Transaction>? transactions)
    {
        return transactions
            ?.GroupBy(t => new { t.Account.BranchCode, t.Account.AccountType, t.Status })
            .Select(g => new TransactionSummary
            {
                BranchCode = g.Key.BranchCode,
                AccountType = g.Key.AccountType.ToString(),
                Status = g.Key.Status.ToString(),
                AmountSum = g.Sum(t => t.Amount),
                PaymentCount = g.Count()
            })
            .OrderBy(r => r.BranchCode)
            .ThenBy(r => r.Status)
            .ToList();
    }
}