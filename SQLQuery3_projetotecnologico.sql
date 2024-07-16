-- Criação do banco de dados
CREATE DATABASE SiteDeVagas;
GO

USE SiteDeVagas;
GO

-- Tabela de Candidatos
CREATE TABLE Candidatos (
    CandidatoID INT PRIMARY KEY IDENTITY(1,1),
    Nome NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Telefone NVARCHAR(20),
    DataNascimento DATE,
    Endereco NVARCHAR(200),
    Cidade NVARCHAR(100),
    Estado NVARCHAR(100),
    Pais NVARCHAR(100),
    DataCadastro DATETIME DEFAULT GETDATE()
);
GO

-- Tabela de Empresas
CREATE TABLE Empresas (
    EmpresaID INT PRIMARY KEY IDENTITY(1,1),
    Nome NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Telefone NVARCHAR(20),
    Endereco NVARCHAR(200),
    Cidade NVARCHAR(100),
    Estado NVARCHAR(100),
    Pais NVARCHAR(100),
    DataCadastro DATETIME DEFAULT GETDATE()
);
GO

-- Tabela de Vagas
CREATE TABLE Vagas (
    VagaID INT PRIMARY KEY IDENTITY(1,1),
    Titulo NVARCHAR(100) NOT NULL,
    Descricao NVARCHAR(1000),
    EmpresaID INT FOREIGN KEY REFERENCES Empresas(EmpresaID),
    Localizacao NVARCHAR(200),
    DataCriacao DATETIME DEFAULT GETDATE(),
    DataExpiracao DATETIME,
    Salario DECIMAL(18, 2),
    Requisitos NVARCHAR(1000)
);
GO

-- Tabela de Currículos
CREATE TABLE Curriculos (
    CurriculoID INT PRIMARY KEY IDENTITY(1,1),
    CandidatoID INT FOREIGN KEY REFERENCES Candidatos(CandidatoID),
    CaminhoArquivo NVARCHAR(200) NOT NULL,
    DataUpload DATETIME DEFAULT GETDATE()
);
GO

-- Tabela de Candidaturas
CREATE TABLE Candidaturas (
    CandidaturaID INT PRIMARY KEY IDENTITY(1,1),
    CandidatoID INT FOREIGN KEY REFERENCES Candidatos(CandidatoID),
    VagaID INT FOREIGN KEY REFERENCES Vagas(VagaID),
    DataCandidatura DATETIME DEFAULT GETDATE(),
    Status NVARCHAR(50) DEFAULT 'Pendente'
);
GO
