USE [AusgabenDb]
GO

INSERT INTO [dbo].Haushalt
           ([Name])
     VALUES
           ('Testhaushalt')
GO


INSERT INTO [dbo].[AusgabenTyp]
           ([Name])
     VALUES
           ('Sonstige'),
		   ('Lebensmittel'),
		   ('Haushalt'),
		   ('B�ro'),
		   ('Luxus'),
		   ('K�rperpflege')
GO

INSERT INTO [dbo].[Shop]
           ([Name])
     VALUES
           ('Sonstige'),
		   ('REWE'),
		   ('Penny'),
		   ('Edeka'),
		   ('Lidl'),
		   ('Kaufland'),
		   ('Nahkauf')
GO

INSERT INTO [dbo].[User]
           ([Name])
     VALUES
           ('Sonstige'),
		   ('Ich')
GO




