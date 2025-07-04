import './App.css'
import ButtonClickCounter from './EventHandings/ButtonClickCounter';
import CheckboxToggle from './EventHandings/CheckboxToggle';
import DoubleClickMessage from './EventHandings/DoubleClickMessage';
import DropdownSelection from './EventHandings/DropdownSelection';
import FormSubmissionAlert from './EventHandings/FormSubmissionAlert';
import HoverHighlight from './EventHandings/HoverHighlight';
import InputFieldTracker from './EventHandings/InputFieldTracker';
import KeyPressDisplay from './EventHandings/KeyPressDisplay';
import SearchFilter from './EventHandings/SearchFilter';
import ToggleSwitch from './EventHandings/ToggleSwitch';

function App() {
  return (
    <main className='container'>
      <ButtonClickCounter />
      <InputFieldTracker />
      <ToggleSwitch />
      <HoverHighlight />
      <FormSubmissionAlert />
      <KeyPressDisplay />
      <DoubleClickMessage />
      <DropdownSelection />
      <CheckboxToggle />
      <SearchFilter />
    </main>
  );
}

export default App;
