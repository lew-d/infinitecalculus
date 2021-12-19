import Differentiation from "../../lib/generators/differentiation"
import Integration from "../../lib/generators/integration"
import Logarithms from "../../lib/generators/logarithms"
import Trigonometry from "../../lib/generators/trigonometry"

const Topics = [
    { name: 'Differentiation', active: true, generator: Differentiation },
    { name: 'Integration', active: false, generator: Integration },
    { name: 'Logarithms', active: false, generator: Logarithms },
    { name: 'Trigonometry', active: false, generator: Trigonometry },
]

export default Topics
