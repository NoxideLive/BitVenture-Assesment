using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Database;

public class Account
{
    [Key] public string? AccountNumber { get; set; }
    public string? AccountHolder { get; set; }

    public string? BranchCode { get; set; }

    public Utils.AccountType AccountType { get; set; }
}