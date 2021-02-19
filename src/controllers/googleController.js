module.exports = {
    home: (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('api/v1/home');
        // res.send('berhasil authenticate')
    },
    logout: (req, res) => {
        req.session = null;
        req.logout();
        res.redirect('api/v1/login');
    }
}
