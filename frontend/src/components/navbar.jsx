import React from 'react'
import { Link} from 'react-router-dom';

const Navbar = () => {

   
  return (
    <div>

<nav class="bg-white shadow shadow-gray-300 w-100 px-8 md:px-auto">
	<div class="md:h-24 h-44 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
		{/* <!-- Logo --> */}
		<div class="text-indigo-500 md:order-1">
			{/* <!-- Heroicon - Chip Outline --> */}
			<img
                        className="w-14 h-14 mr-2"
                        src='https://cdn-icons-png.flaticon.com/512/1040/1040254.png'
                        alt="logo"
                      /> 
		</div>
		<div class="text-gray-500 order-3 w-full md:w-auto md:order-2">
			<ul class="flex font-semibold justify-between">
                {/* <!-- Active Link = text-indigo-500 */}
                {/* Inactive Link = hover:text-indigo-500 --> */}
				<li class="md:px-4 md:py-2 hover:text-indigo-400"><Link to="/category">Categoria</Link></li>
				<li class="md:px-4 md:py-2 hover:text-indigo-400"><Link to="/category">Producto</Link></li>
				<li class="md:px-4 md:py-2 hover:text-indigo-400"><Link to="/producto">Cliente</Link></li>
				<li class="md:px-4 md:py-2 hover:text-indigo-400"><Link to="/category">Personal</Link></li>
				<li class="md:px-4 md:py-2 hover:text-indigo-400"><Link to="/category">Venta</Link></li>
			</ul>
		</div>
		<div class="order-2 md:order-3">
			<button class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                {/* <!-- Heroicons - Login Solid --> */}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>Login</span>
            </button>
		</div>
	</div>
</nav>


      
    </div>
  )
}

export default Navbar
