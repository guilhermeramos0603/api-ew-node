DROP TABLE IF EXISTS TB_heroes;
CREATE TABLE TB_heroes (
     ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY    NOT NULL,
     NOME  TEXT    NOT NULL,
     PODER TEXT    NOT NULL
);
-- create
INSERT INTO TB_heroes
    (NOME, PODER)
VALUES
    ('Flash', 'Velocidade'),
    ('Batman', 'Dinheiro'),
    ('Aquaman', 'Marinho');
-- read
SELECT *
FROM TB_heroes;
-- update
UPDATE TB_heroes 
SET NOME = 'Goku', PODER= 'Deus'
WHERE ID = 1;
--delete
DELETE FROM TB_heroes WHERE ID = 2;