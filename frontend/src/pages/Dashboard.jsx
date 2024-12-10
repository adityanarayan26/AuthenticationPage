import React, { useEffect } from 'react';
import { Loader, LogOut } from 'lucide-react';
import { UseStore } from '../store/UseStore';
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const { logout, isLoading, loggedInUser } = UseStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="h-screen w-full bg-zinc-300">
      
   

      <div className='w-full h-32 p-10'>

        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        <h1 className='text-black font-sans font-semibold capitalize'>Hello, {loggedInUser && loggedInUser}!</h1>
      </div>
      {loggedInUser && (
        <div className="mt-4">
         
          <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-center md:gap-8">
                <div className="md:col-span-1">
                  <div className="max-w-lg md:max-w-none">
                    <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </h2>

                    <p className="mt-4 text-gray-700">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur doloremque saepe
                      architecto maiores repudiandae amet perferendis repellendus, reprehenderit voluptas
                      sequi.
                    </p>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <img
                    src="https://images.unsplash.com/photo-1731690415686-e68f78e2b5bd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="rounded"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>
          <button
            onClick={handleLogout}
            className="mt-2 bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition-all"
          >
            {isLoading ? <Loader className="animate-spin" /> : <LogOut className="inline-block mr-2" />}
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
