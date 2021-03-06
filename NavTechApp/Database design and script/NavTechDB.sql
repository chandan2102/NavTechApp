USE [NavtechDB]
GO
/****** Object:  StoredProcedure [dbo].[SPGetRecord]    Script Date: 06/07/2021 5:37:42 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[SPGetRecord]
GO
/****** Object:  StoredProcedure [dbo].[SPGetAllRecords]    Script Date: 06/07/2021 5:37:42 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[SPGetAllRecords]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 06/07/2021 5:37:42 PM ******/
DROP TABLE IF EXISTS [dbo].[Product]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 06/07/2021 5:37:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[EntityName] [nvarchar](50) NOT NULL,
	[FieldName] [nvarchar](50) NOT NULL,
	[IsRequired] [bit] NOT NULL,
	[MaxLength] [bigint] NOT NULL,
	[FieldSource] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[EntityName] ASC,
	[FieldName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[Product] ([EntityName], [FieldName], [IsRequired], [MaxLength], [FieldSource]) VALUES (N'1', N'1', 1, 1, N'1')
INSERT [dbo].[Product] ([EntityName], [FieldName], [IsRequired], [MaxLength], [FieldSource]) VALUES (N'2', N'2', 1, 2, N'2')
INSERT [dbo].[Product] ([EntityName], [FieldName], [IsRequired], [MaxLength], [FieldSource]) VALUES (N'3', N'3', 1, 3, N'3')
INSERT [dbo].[Product] ([EntityName], [FieldName], [IsRequired], [MaxLength], [FieldSource]) VALUES (N'4', N'4', 1, 4, N'4')
INSERT [dbo].[Product] ([EntityName], [FieldName], [IsRequired], [MaxLength], [FieldSource]) VALUES (N'Product1', N'DField1', 1, 10, N'/api/DefaultFields')
INSERT [dbo].[Product] ([EntityName], [FieldName], [IsRequired], [MaxLength], [FieldSource]) VALUES (N'Product2', N'DField2', 0, 222, N'/api/DefaultFields')
INSERT [dbo].[Product] ([EntityName], [FieldName], [IsRequired], [MaxLength], [FieldSource]) VALUES (N'Product3', N'CField1', 1, 333, N'/api/CustomFields')
INSERT [dbo].[Product] ([EntityName], [FieldName], [IsRequired], [MaxLength], [FieldSource]) VALUES (N'Product4', N'testField', 0, 111, N'/api/CustomFields')
INSERT [dbo].[Product] ([EntityName], [FieldName], [IsRequired], [MaxLength], [FieldSource]) VALUES (N'Product5', N'testField2', 1, 999, N'api/testt1')
GO
/****** Object:  StoredProcedure [dbo].[SPGetAllRecords]    Script Date: 06/07/2021 5:37:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPGetAllRecords] 
AS
BEGIN
	SET NOCOUNT ON;
	SELECT 
	   [EntityName]
      ,[FieldName]
      ,[IsRequired]
      ,[MaxLength]
      ,[FieldSource]
     FROM [NavtechDB].[dbo].[Product]
END
GO
/****** Object:  StoredProcedure [dbo].[SPGetRecord]    Script Date: 06/07/2021 5:37:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPGetRecord]
	@entNm varchar(50), @fldnm varchar(50)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT 
	   [EntityName]
      ,[FieldName]
      ,[IsRequired]
      ,[MaxLength]
      ,[FieldSource]
     FROM [NavtechDB].[dbo].[Product]
	 WHERE [EntityName] = @entNm AND [FieldName] = @fldnm
END
GO
