CREATE TABLE [bet].[bets]
(
	[surrogate_id] INT NOT NULL IDENTITY(1, 1),
	[id] UNIQUEIDENTIFIER NOT NULL, 
    [description] VARCHAR(50) NOT NULL, 
    [coins] INT NOT NULL, 
    [end_date] DATETIME NOT NULL, 
    [max_answer_date] DATETIME NOT NULL, 
    [bettor_id] VARCHAR(50) NOT NULL, 
    [guests] VARCHAR(MAX) NOT NULL, 
    [is_successful] BIT NULL, 
    [created_at] DATETIME2 NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ([id])
)

GO

CREATE INDEX [IX_bets_bettor_id] ON [bet].[bets] ([bettor_id])
GO
