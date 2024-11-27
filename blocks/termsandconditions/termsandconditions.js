export default function decorate(block) { 
    console.log(block)
    const allh2s = document?.querySelectorAll('.termsandconditions h2');
    if (allh2s) {
        allh2s.forEach(el => {
            el.classList.add('isH2Div');
        })
    }

}