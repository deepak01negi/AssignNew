const ADMIN_ROLE = 1;
const SELLER_ROLE = 2;
const SUPPORTER_ROLE = 3;
const CUSTOMER_ROLE = 4;

const checkUserRole = (req, res, next) => {
    const { userDetails } = req.body;
    const { method } = req;
    if (method === "POST" || method === "PATCH" || method === "PUT") {
        if (userDetails.role === SUPPORTER_ROLE || userDetails.role === CUSTOMER_ROLE) {
            return res.status(401).json({ success: false, message: "Not authorized to access endpoint" });
        }
    }
    if (method === "DELETE") {
        if (userDetails.role !== SUPPORTER_ROLE) {
            return res.status(401).json({ success: false, message: "Not authorized to access endpoint" });
        }
    }
    next();
}

module.exports = checkUserRole;