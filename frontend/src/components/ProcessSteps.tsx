import ThemeCard from './ThemeCard'

interface Step {
  number: number
  title: string
  description: string
}

interface ProcessStepsProps {
  steps: Step[]
}

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {steps.map((step, index) => (
        <div key={step.number} className={index >= 3 ? 'lg:col-span-1' : ''}>
          <ThemeCard className="text-center">
            <div className="text-3xl font-bold text-primary mb-3">{step.number}.</div>
            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-sm opacity-70">{step.description}</p>
          </ThemeCard>
        </div>
      ))}
    </div>
  )
}
