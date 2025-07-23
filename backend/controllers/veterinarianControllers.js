
const resgister = (req, res) => {
    res.json({msg: 'Resgistrando usuario...'}) 
};

const profile = (req, res) => {
    res.json({msg: 'Mostrando persil...'})
}

export {
    resgister,
    profile
} 
