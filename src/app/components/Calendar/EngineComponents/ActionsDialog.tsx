export default function ActionsDialog(){
    return (
        <div className='inset-x-px bottom-0'>
    <div className='flex  justify-end pt-1.5 mr-1.5'>
    <button
      type="submit"
      className="inline-flex justify-center py-2 px-4 border border-gray-600 shadow-sm text-sm font-medium rounded-lg text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
    >
      Save
    </button>
    <button
      type="button"
      onClick={() => {console.log('hi')}}
      className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
    >
      Cancel
    </button>
    </div>
    </div>
    )
}