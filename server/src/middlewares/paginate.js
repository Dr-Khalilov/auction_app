module.exports = paginate = async (req, res, next) => {
    try {
        const {
            query: { page = 1, limit = 10 },
        } = req;
        req.pagination = {
            offset: (page - 1) * limit,
            limit: limit,
        };
        next();
    } catch (error) {
        next(error);
    }
};