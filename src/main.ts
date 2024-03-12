import './style.css'
import { createExample } from './showcase/Example';


const examplesContainer = document.getElementById("examples");

examplesContainer?.appendChild(createExample("sample-1.jpg"));
examplesContainer?.appendChild(createExample("sample-2.jpg"));
