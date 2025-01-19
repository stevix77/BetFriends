CREATE TABLE [bet].[answers]
(
	[bet_id] UNIQUEIDENTIFIER NOT NULL, 
    [gambler_id] UNIQUEIDENTIFIER NOT NULL, 
    [answer] BIT NULL, 
    [upserted_at] DATETIME2 NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ([bet_id], [gambler_id])
)
