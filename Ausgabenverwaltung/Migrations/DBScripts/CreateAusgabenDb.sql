USE [master]
GO

/****** Object:  Database [AusgabenDb]    Script Date: 14.04.2020 13:44:43 ******/
CREATE DATABASE [AusgabenDb]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'AusgabenDb', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\AusgabenDb.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'AusgabenDb_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\AusgabenDb_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [AusgabenDb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [AusgabenDb] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [AusgabenDb] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [AusgabenDb] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [AusgabenDb] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [AusgabenDb] SET ARITHABORT OFF 
GO

ALTER DATABASE [AusgabenDb] SET AUTO_CLOSE ON 
GO

ALTER DATABASE [AusgabenDb] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [AusgabenDb] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [AusgabenDb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [AusgabenDb] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [AusgabenDb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [AusgabenDb] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [AusgabenDb] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [AusgabenDb] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [AusgabenDb] SET  ENABLE_BROKER 
GO

ALTER DATABASE [AusgabenDb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [AusgabenDb] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [AusgabenDb] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [AusgabenDb] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [AusgabenDb] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [AusgabenDb] SET READ_COMMITTED_SNAPSHOT ON 
GO

ALTER DATABASE [AusgabenDb] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [AusgabenDb] SET RECOVERY SIMPLE 
GO

ALTER DATABASE [AusgabenDb] SET  MULTI_USER 
GO

ALTER DATABASE [AusgabenDb] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [AusgabenDb] SET DB_CHAINING OFF 
GO

ALTER DATABASE [AusgabenDb] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [AusgabenDb] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO

ALTER DATABASE [AusgabenDb] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [AusgabenDb] SET QUERY_STORE = OFF
GO

ALTER DATABASE [AusgabenDb] SET  READ_WRITE 
GO


