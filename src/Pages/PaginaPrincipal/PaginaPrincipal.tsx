import React from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, DataSnapshot } from 'firebase/database';
import EcommerceCard from '../../Components/EcommerceCard/EcommerceCard';
import './StylePaginaPrincipal.css'


interface Ecommerce {
  id: string; // Adicione o ID do e-commerce
  ecommerce_name: string;
  category: string;
  website: string;
  provinceSelect: string;
  citySelect: string;
  phone: string;
  contact_email: string;
  legal_representative: string;
  foundation_date: string;
  status: boolean;
  profileImage: string;
}

const EcommerceData: React.FC = () => {
  // Initialize Firebase connection
  const firebaseConfig = {
    apiKey: "AIzaSyA5W3WDwlAgF8Qn5ptmZ4V4JvVaHQ5KBEk",
    authDomain: "feedback-aqui.firebaseapp.com",
    databaseURL: "https://feedback-aqui-default-rtdb.firebaseio.com",
    projectId: "feedback-aqui",
    storageBucket: "feedback-aqui.appspot.com",
    messagingSenderId: "390730068105",
    appId: "1:390730068105:web:4f9c564b63192d6ddc5658",
    measurementId: "G-4V5LL17MRE"
  };

  // Initialize Firebase app
  const app = initializeApp(firebaseConfig);

  // Get a reference to the database
  const db = getDatabase(app);

  const [ecommerces, setEcommerces] = React.useState<Ecommerce[]>([]);

  React.useEffect(() => {
    // Access the "feedbackAqui/ecommerces" node within the database
    const ecommerceRef = ref(db, "feedbackAqui/ecommerces");
  
    const unsubscribe = onValue(ecommerceRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      console.log('Data from Firebase:', data); // Log data received from Firebase

      if (data) {
        const dataArray: Ecommerce[] = Object.keys(data).map((key) => {
          const ecommerce = data[key];
          console.log('Ecommerce item:', ecommerce); // Log each ecommerce item
          return ecommerce;
        });
        setEcommerces(dataArray);
      } else {
        console.log('No data available');
        setEcommerces([]);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [db]);

  console.log('Ecommerces state:', ecommerces); // Log the ecommerces state

  return (
    <div className="container">
      <h1>Lista de E-commerces</h1>

      <div id="progress-bar-container">
        <div id="progress-bar"></div>
      </div>

      <div id="ecommerceCards" className="cards-container">
        {ecommerces.length > 0 ? (
          ecommerces.map((ecommerce) => (
            <EcommerceCard key={ecommerce.ecommerce_name} ecommerce={ecommerce} />
          ))
        ) : (
          <p>Nenhum e-commerce encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default EcommerceData;