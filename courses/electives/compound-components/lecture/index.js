import * as React from 'react'
import * as ReactDOM from 'react-dom'
import LoginForm from 'YesterTech/LoginForm'
import SignupForm from 'YesterTech/SignupForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

const TabsContext = React.createContext()

export function Tabs({ children, ...props }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const context = {
    selectedIndex,
    setSelectedIndex,
  }

  return (
    <TabsContext.Provider value={context}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  )
}

function TabList({ children, ...props }) {
  const { selectedIndex, setSelectedIndex } = React.useContext(TabsContext)

  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      isSelected: index === selectedIndex,
      onClick: () => setSelectedIndex(index),
    })
  })

  return (
    <div {...props} className="tab-list">
      {children}
    </div>
  )
}

function Tab({ children, isSelected, onClick, ...props }) {
  return (
    <button
      role="tab"
      {...props}
      aria-selected={isSelected}
      className="tab"
      data-selected={isSelected ? '' : undefined}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function TabPanels({ children, ...props }) {
  const { selectedIndex } = React.useContext(TabsContext)

  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      isSelected: index === selectedIndex,
    })
  })

  return (
    <div {...props} className="tab-panels">
      {children}
    </div>
  )
}

function TabPanel({ children, isSelected, ...props }) {
  return (
    <div {...props} className="tab-panel" hidden={!isSelected}>
      {children}
    </div>
  )
}

function App() {
  return (
    <Tabs>
      <TabList>
        <Tab>Login</Tab>
        <Tab>Signup</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <LoginForm />
        </TabPanel>
        <TabPanel>
          <SignupForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
