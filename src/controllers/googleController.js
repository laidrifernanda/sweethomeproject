module.exports = {
    home: (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/home');
        // res.send('berhasil authenticate')
    },
    logout: (req, res) => {
        req.session = null;
        req.logout();
        res.redirect('/login');
    }
}
