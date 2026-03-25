import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, LogOut, Plus, Edit, Trash2, Eye } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  createdAt: string;
  partner1: { name: string; type: string };
  partner2: { name: string; type: string };
  theme: string;
  events: any[];
  photos: any[];
  guests: any[];
  games: boolean;
  story: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('weddingUser');
    const savedProjects = localStorage.getItem('weddingProjects');

    /** No auth required — guest mode until accounts ship */
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser({ name: 'Guest' });
    }
    if (savedProjects) setProjects(JSON.parse(savedProjects));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('weddingUser');
    navigate('/');
  };

  const createNewProject = () => {
    navigate('/create');
  };

  const editProject = (project: Project) => {
    localStorage.setItem('currentProject', JSON.stringify(project));
    navigate('/create');
  };

  const deleteProject = (id: number) => {
    if (confirm('Delete this project?')) {
      const updatedProjects = projects.filter(p => p.id !== id);
      setProjects(updatedProjects);
      localStorage.setItem('weddingProjects', JSON.stringify(updatedProjects));
    }
  };

  const previewProject = (project: Project) => {
    localStorage.setItem('previewProject', JSON.stringify(project));
    navigate('/preview');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 text-2xl font-bold text-rose-600">
            <Heart className="fill-rose-500" />
            <span>Forever<span className="text-orange-500">Foundry</span></span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Hello, {user?.name}!</span>
            <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 text-rose-600 hover:bg-rose-50 rounded-lg transition">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Your Wedding Websites</h1>
          <button onClick={createNewProject} className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-full hover:shadow-lg transition">
            <Plus className="w-5 h-5" />
            <span>Create New Website</span>
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-24 h-24 text-rose-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 mb-2">No projects yet</h2>
            <p className="text-gray-500 mb-6">Create your first wedding website to get started!</p>
            <button onClick={createNewProject} className="px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-full hover:shadow-lg transition">
              Create Your First Website
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                <div className="h-40 bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center">
                  <Heart className="w-20 h-20 text-white fill-white opacity-50" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {project.partner1.name} & {project.partner2.name}
                  </p>
                  <p className="text-gray-500 text-xs mb-4">Created: {new Date(project.createdAt).toLocaleDateString()}</p>
                  <div className="flex space-x-2">
                    <button onClick={() => editProject(project)} className="flex-1 px-4 py-2 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200 transition flex items-center justify-center space-x-1">
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button onClick={() => previewProject(project)} className="flex-1 px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition flex items-center justify-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button onClick={() => deleteProject(project.id)} className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;