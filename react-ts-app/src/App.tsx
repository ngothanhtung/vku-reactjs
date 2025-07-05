import './App.css';
import ButtonClickCounter from './Sesson05-Guidelines/EventHandings/ButtonClickCounter';
import CheckboxToggle from './Sesson05-Guidelines/EventHandings/CheckboxToggle';
import DoubleClickMessage from './Sesson05-Guidelines/EventHandings/DoubleClickMessage';
import DropdownSelection from './Sesson05-Guidelines/EventHandings/DropdownSelection';
import FormSubmissionAlert from './Sesson05-Guidelines/EventHandings/FormSubmissionAlert';
import HoverHighlight from './Sesson05-Guidelines/EventHandings/HoverHighlight';
import InputFieldTracker from './Sesson05-Guidelines/EventHandings/InputFieldTracker';
import KeyPressDisplay from './Sesson05-Guidelines/EventHandings/KeyPressDisplay';
import SearchFilter from './Sesson05-Guidelines/EventHandings/SearchFilter';
import ToggleSwitch from './Sesson05-Guidelines/EventHandings/ToggleSwitch';

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
