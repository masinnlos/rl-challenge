import { DynamicForm } from "./components/DynamicForm";

export interface RestObjectData {
    [key: string]: string | number;
  }
  
  export interface RestObject {
    id?: string;
    name: string;
    data: RestObjectData;
  }
  
  export interface FormValues {
    name: string;
    fields? : any;
    [key: string]: string | number;
  }

  export interface RootLayoutProps {
    children: React.ReactNode;
  }