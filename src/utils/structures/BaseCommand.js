module.exports = class BaseCommand {
    constructor(name, category) {
        this.name = name;
        this.category = category;
        this.aliases;
        this.description;
        this.usage;
    }
}