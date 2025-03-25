import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-6">

      <h1 className="text-5xl font-bold text-yellow-500 mb-4 animate-bounce">Oops!</h1>


      <h2 className="text-2xl mb-4 text-center">We couldn`t find the page you`re looking for. Sorry!</h2>

   
      <p className="text-lg mb-6 text-center">Don`t worry, you can go back to the homepage.</p>

 
      <div className="mt-6">
        <Link href="/" className="inline-block px-6 py-3 bg-yellow-500  font-semibold rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:bg-yellow-600">
          Return Home
        </Link>
      </div>
    </div>
  )
}
