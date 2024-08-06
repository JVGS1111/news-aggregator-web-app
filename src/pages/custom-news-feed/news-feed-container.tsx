import { Navigator } from './components/navigator'
const tabs = ['News Feed', 'Preferences']
export function NewsFeedContainer() {
  return (
    <section className="m-auto mt-16 flex w-full max-w-feed flex-col items-center justify-center px-6 pb-6">
      <Navigator options={tabs} onChange={() => {}} defaultValue={tabs[0]} />
    </section>
  )
}
