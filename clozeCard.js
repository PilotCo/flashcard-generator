var ClozeCard = function(full, partial){
	this.type = "cloze";
	this.full = full;
	this.partial = partial;
	this.close = full.replace(partial, "____");
};

module.exports = ClozeCard;