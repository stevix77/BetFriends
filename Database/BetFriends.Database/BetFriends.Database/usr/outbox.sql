﻿CREATE TABLE [usr].[outbox]
(
	[surrogate_id] INT NOT NULL IDENTITY(1, 1),
	[id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,
	[type] VARCHAR(50) NOT NULL,
	[data] VARCHAR(MAX) NOT NULL,
	[occured_on] DATETIME2(7) NOT NULL,
	[processed_on] DATETIME2(7) NULL
)