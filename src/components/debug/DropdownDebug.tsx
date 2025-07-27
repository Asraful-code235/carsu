import { sanityFetch } from "@/sanity/lib/live";
import { DEFAULT_HEADER_QUERY } from "@/sanity/lib/queries/headerQueries";
import { getLocalizedValue } from "@/lib/i18n/utils";

export async function DropdownDebug() {
  try {
    const { data: headerData } = await sanityFetch({
      query: DEFAULT_HEADER_QUERY,
    });

    const dropdownNavItems = headerData?.navigation?.filter((item: any) => item.hasDropdown) || [];

    return (
      <div className="bg-yellow-100 p-4 m-4 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Dropdown Debug Information</h2>
        
        <div className="space-y-4">
          {dropdownNavItems.map((navItem: any, index: number) => (
            <div key={index} className="bg-white p-3 rounded">
              <h3 className="font-semibold text-blue-800">{getLocalizedValue(navItem.title, 'en')}</h3>
              <div className="text-sm space-y-2">
                <div><strong>Has Dropdown:</strong> {navItem.hasDropdown ? 'Yes' : 'No'}</div>
                <div><strong>Dropdown Layout:</strong></div>
                <pre className="bg-gray-100 p-2 rounded text-xs">
                  {JSON.stringify(navItem.dropdownLayout, null, 2)}
                </pre>
                <div><strong>Dropdown Items:</strong></div>
                {navItem.dropdownItems?.map((item: any, itemIndex: number) => (
                  <div key={itemIndex} className="ml-4 border-l-2 border-gray-300 pl-2">
                    <div><strong>Title:</strong> {item.title}</div>
                    <div><strong>Has Image:</strong> {item.image ? 'Yes' : 'No'}</div>
                    {item.image && (
                      <div>
                        <strong>Image Data:</strong>
                        <pre className="bg-gray-100 p-1 rounded text-xs">
                          {JSON.stringify(item.image, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="bg-red-100 p-4 m-4 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Dropdown Debug Error</h2>
        <pre className="text-red-700 text-sm">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      </div>
    );
  }
}
