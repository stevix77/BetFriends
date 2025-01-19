CREATE TABLE [bet].[members]
(
	[surrogate_id] INT NOT NULL IDENTITY(1, 1), 
    [id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, 
    [username] VARCHAR(50) NOT NULL, 
    [wallet] INT NOT NULL, 
    [count_friends] INT NOT NULL, 
    [created_at] DATETIME2 NOT NULL DEFAULT CURRENT_TIMESTAMP
)
