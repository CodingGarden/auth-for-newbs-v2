const list = async (req, res, next) => {
    try {
        const result = await users.find({}, '-password');
        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    list
};
