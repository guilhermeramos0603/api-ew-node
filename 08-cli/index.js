const { Command } = require("commander");
const Database = require("./database");
const Hero = require("./hero");

async function main() {
    const program = new Command();

    program
        .version("v1")
        .option("-n, --name [value]", "Hero name")
        .option("-p, --power [value]", "Hero power")
        .option("-i, --id [value]", "Hero id")
        .option("-c, --create", "Create Hero")
        .option("-r, --read", "Read Hero")
        .option("-u, --update [value]", "Update Hero")
        .option("-d, --delete", "Delete Hero")

    program.parse(process.argv);

    const options = program.opts();
    const hero = new Hero(options);

    try {
        //cadastrar
        if (options.create) {
            delete hero.id
            const result = await Database.create(hero);

            if (!result) {
                console.error("Error to create hero!");
                return;
            }
            console.log("Hero created!");
        }

        //listar
        if (options.read) {
            const result = await Database.read();
            console.log(result);
            return;
        }

        //atualizar
        if (options.update) {
            const data = JSON.stringify(hero);
            const heroUpdate = JSON.parse(data);
            const result = await Database.update(heroUpdate.id, heroUpdate)
            if (!result) {
                console.error("Error to update hero!");
                return;
            }
            console.log("Hero updated!");
        }

        //remover
        if (options.delete) {
            if(!hero.id){
                console.error("Id not informed!");
                return;
            }
            const result = Database.delete(hero.id)
            if (!result) {
                console.error("Error to delete hero!");
                return;
            }
            console.log("Hero deleted!");
        }
    } catch (error) {
        console.error("FAILED!", error);
    }
}

main();