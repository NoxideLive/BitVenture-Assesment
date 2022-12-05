using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Database;

public class Transaction
{
    [Key] public int PaymentId { get; set; }
    [ForeignKey("AccountNumber")] public Account? Account { get; set; }
    public double Amount { get; set; }
    public Utils.TransactionStatus Status { get; set; }
    public DateTime EffectiveStatusDate { get; set; }
    public DateTime? TransactionDate { get; set; }
    public bool TimeBreached { get; set; }
}