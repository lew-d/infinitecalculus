import Differentiation from "../../lib/generators/differentiation"
import Integration from "../../lib/generators/Integration"
import Logarithms from "../../lib/generators/Logarithms"
import Trigonometry from "../../lib/generators/Trigonometry"

const Topics = [
    { name: 'Differentiation', active: true, generator: Differentiation },
    { name: 'Integration', active: false, generator: Integration },
    { name: 'Logarithms', active: false, generator: Logarithms },
    { name: 'Trigonometry', active: false, generator: Trigonometry },
]

export default Topics
