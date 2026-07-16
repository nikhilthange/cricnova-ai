import { PlayCircle, Video } from "lucide-react";

const mockVideos = [
  {
    id: "hJ4YFp6D99M",
    title: "Virat Kohli's Unbelievable 82* vs Pakistan | T20 World Cup 2022",
    thumbnail: "https://i.ytimg.com/vi/hJ4YFp6D99M/maxresdefault.jpg",
    duration: "10:15",
    views: "45M"
  },
  {
    id: "gNCLj8yU3_A",
    title: "Glenn Maxwell's Historic 201* vs Afghanistan | CWC 2023",
    thumbnail: "https://i.ytimg.com/vi/gNCLj8yU3_A/maxresdefault.jpg",
    duration: "14:20",
    views: "22M"
  },
  {
    id: "dJvYmY7N55w",
    title: "MS Dhoni's Iconic World Cup Winning Six | 2011 Final",
    thumbnail: "https://i.ytimg.com/vi/dJvYmY7N55w/maxresdefault.jpg",
    duration: "5:32",
    views: "89M"
  },
  {
    id: "yWzM5Y8F65E",
    title: "Ben Stokes' Miracle at Headingley | Ashes 2019",
    thumbnail: "https://i.ytimg.com/vi/yWzM5Y8F65E/maxresdefault.jpg",
    duration: "18:45",
    views: "34M"
  },
  {
    id: "vBw5jH8T92k",
    title: "Rohit Sharma's Record 264 vs Sri Lanka | ODI Highlights",
    thumbnail: "https://i.ytimg.com/vi/vBw5jH8T92k/maxresdefault.jpg",
    duration: "12:10",
    views: "56M"
  },
  {
    id: "t4L7uX7H52o",
    title: "Mitchell Starc's Deadly Yorker to Brendon McCullum | CWC 2015 Final",
    thumbnail: "https://i.ytimg.com/vi/t4L7uX7H52o/maxresdefault.jpg",
    duration: "2:15",
    views: "18M"
  }
];

export default function Videos() {
  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
            <Video className="w-8 h-8 text-red-500" />
            Highlights & Media
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Watch the most iconic moments in cricket history</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockVideos.map((video) => (
          <div key={video.id} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800 flex flex-col cursor-pointer">
            <div className="relative aspect-video bg-slate-900 overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:bg-red-600 transition-colors">
                  <PlayCircle className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs font-bold rounded">
                {video.duration}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {video.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-auto">
                {video.views} views • Historical Archive
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
