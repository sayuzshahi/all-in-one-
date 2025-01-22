document.getElementById("change").addEventListener('click', () => {

    document.getElementById("text").style.color = "blue";
}


)

document.getElementById("change1").addEventListener('click', () => {

    document.getElementById("text").innerHTML = "text not here";
})



document.getElementById("add").addEventListener('click', () => {
    const first = parseFloat(document.getElementById("num1").value);

    const second = parseFloat(document.getElementById("num2").value);

    const sum = first + second;

    document.getElementById("add").addEventListener('click', () => {
        const first = parseFloat(document.getElementById("num1").value);

        const second = parseFloat(document.getElementById("num2").value);

        const sum = first + second;

        document.getElementById("add").addEventListener('click', () => {
            const first = parseFloat(document.getElementById("num1").value);

            const second = parseFloat(document.getElementById("num2").value);

            const sum = first + second;

            document.getElementById("show").innerHTML = `${sum}`




        })
    })
})
