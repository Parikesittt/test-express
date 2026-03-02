export const validateRegister = (req, res, next) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    if (!isValidPassword(password)) {
        return res.status(400).json({
            error: "Password must meet minimum length requirement",
        });
    }

    next();
};

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password are required",
        });
    }

    next();
};