CREATE TABLE solutions
(
    Id int NOT NULL auto_increment primary key,
  description VARCHAR(300) NOT NULL,
  Category_Id int not NULL,
  FOREIGN KEY (category_Id) REFERENCES Problem_Categories(id)
);

CREATE TABLE Problem_Categories 
(
   Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   category_name VARCHAR(15)
);

CREATE TABLE User 
(
  Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username int NOT NULL,
  refNo int,
  helpedBy VARCHAR(50) NOT NULL,
  agentRatings int
);