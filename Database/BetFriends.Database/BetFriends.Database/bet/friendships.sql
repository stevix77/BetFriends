CREATE TABLE [bet].[friendships]
(
	[friend_id] VARCHAR(50) NOT NULL,
	[surrogate_id] INT NOT NULL IDENTITY(1, 1), 
    [requester_id] VARCHAR(50) NOT NULL,
	[created_at] DATETIME2 NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY ([friend_id], [requester_id])
)
