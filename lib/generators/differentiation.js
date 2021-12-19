import { derivative, simplify } from 'mathjs'

function countInstances(string, word) {
    return string.split(word).length - 1;
}

function replaceAllInstances(original, word, f) {
    while (countInstances(original, word) > 0) {
        original = original.replace(word, f())
    }
    return original
}

function randomA() {
    var bases = [
        "x", "2x", "x^2", "(1/2)x"
    ]

    return `(${bases[Math.floor(Math.random() * bases.length)]})`
}

function randomB() {
    var bases = [
        "x-1", "x+1", "x^2", "x^2+x", "log(A)", "sin(A)", "cos(A)", "e^x", "e^2x", "(1/2)x"
    ]

    return `(${bases[Math.floor(Math.random() * bases.length)]})`
}

function generateDifferential() {
    /*
      where a is simple (2 terms, no e lor log)
      b is complex (2 terms, may have e or log)
    */
    var bases = [
        "A/B", "A/sin(A)", "tan(A)/A", "B/cot(A)",
        "B+log(A)", "B+log(A)", "sin(A)+log(A)", "sin(A)^2", "log(A)log(A)",
        "A*cos(A)", "B*e^A"
    ]

    // random base
    var base = bases[Math.floor(Math.random() * bases.length)]

    base = replaceAllInstances(base, "A", randomA)
    base = replaceAllInstances(base, "B", randomB)

    base = replaceAllInstances(base, "A", randomA)
    base = replaceAllInstances(base, "B", randomB)

    return base
}


export default function Differentiation() {
    var eq = simplify(generateDifferential())
    var question = "y=" + eq.toTex().replace("log", "ln")
    var answer = "\\frac{dy}{dx}=" + simplify(derivative(eq, 'x')).toTex().replace("log", "ln")

    return { question, answer }
}