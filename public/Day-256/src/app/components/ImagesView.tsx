import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Play, Trash2, Download } from "lucide-react";

export function ImagesView() {
  const images = [
    { id: "1", name: "nginx", tag: "latest", imageId: "a1b2c3d4e5f6", size: "142MB", created: "2 weeks ago" },
    { id: "2", name: "postgres", tag: "14", imageId: "b2c3d4e5f6a7", size: "376MB", created: "3 weeks ago" },
    { id: "3", name: "redis", tag: "alpine", imageId: "c3d4e5f6a7b8", size: "32MB", created: "1 week ago" },
    { id: "4", name: "mongo", tag: "5.0", imageId: "d4e5f6a7b8c9", size: "693MB", created: "2 weeks ago" },
    { id: "5", name: "node", tag: "18-alpine", imageId: "e5f6a7b8c9d0", size: "174MB", created: "5 days ago" },
    { id: "6", name: "elasticsearch", tag: "8.0", imageId: "f6a7b8c9d0e1", size: "1.2GB", created: "1 month ago" },
    { id: "7", name: "mysql", tag: "8.0", imageId: "a7b8c9d0e1f2", size: "521MB", created: "2 weeks ago" },
    { id: "8", name: "rabbitmq", tag: "management", imageId: "b8c9d0e1f2a3", size: "255MB", created: "1 week ago" },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Docker Images</CardTitle>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Pull Image
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Repository</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Tag</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Image ID</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Size</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Created</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {images.map((image) => (
                    <tr key={image.id} className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="py-3 px-4 text-white font-medium">{image.name}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-sm">
                          {image.tag}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400 font-mono text-sm">{image.imageId}</td>
                      <td className="py-3 px-4 text-gray-300">{image.size}</td>
                      <td className="py-3 px-4 text-gray-400">{image.created}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          >
                            <Play className="w-3 h-3 mr-1" />
                            Run
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-red-600 text-red-400 hover:bg-red-900"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
