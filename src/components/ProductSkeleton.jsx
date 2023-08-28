
function ProductSkeleton() {
    return (
        <div
            className="shadow animate-pulse  dark:border-gray-700 text-center"
        >
            <div
                role="status"
                className="p-4 md:p-6 col-span-1 h-68 "
            >
                <div className="flex w-full items-center justify-center h-40 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 " />
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default ProductSkeleton
