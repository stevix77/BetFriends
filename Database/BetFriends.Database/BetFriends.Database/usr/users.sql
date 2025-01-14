CREATE TABLE [usr].[users]
(
	[surrogate_id] INT NOT NULL IDENTITY(1, 1), 
    [id] VARCHAR(50) NOT NULL, 
    [username] VARCHAR(50) NOT NULL, 
    [email] VARCHAR(50) NOT NULL, 
    [password] VARCHAR(50) NOT NULL, 
    [refresh_token] VARCHAR(50) NOT NULL, 
    [created_at] DATETIME2 NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY ([id])
)

GO

CREATE INDEX [IX_users_username] ON [usr].[users] ([username])
GO
CREATE INDEX [IX_users_email] ON [usr].[users] ([email])
GO