import { useState, useEffect } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { User, Mail, DollarSign, Package, Calendar, Clock } from "lucide-react";

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  totalInvestment: number;
  acquisitionCount: number;
  lastAcquisition: string | null;
  lastLogin: string | null; 
}

export default function CustomerDirectory() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  const fetchCustomers = async () => {
    if (!token) return;
    try {
      const res = await fetch("/api/admin/customers", {
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (res.ok) {
        const data = await res.json();
        setCustomers(data);
      }
    } catch (err) {
      console.error("Directory fetch failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [token]);

  if (isLoading) return (
    <div className="p-32 text-center font-serif italic text-stone-400 animate-pulse tracking-widest uppercase text-[10px]">
      Consulting the Client Archive...
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-2">
        <div>
          <h2 className="text-3xl font-serif text-stone-900 italic tracking-tight">Client Directory</h2>
          <p className="text-sm text-stone-500 font-light mt-2 max-w-md">
            Managing brand relationships and investment history.
          </p>
        </div>
        <div className="bg-white border border-stone-100 px-8 py-5 rounded-4xl shadow-sm border-b-2 border-b-stone-900/5 shrink-0">
           <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-black">
             Registry: {customers.length} Clients
           </p>
        </div>
      </header>

      <div className="bg-white border border-stone-100 rounded-[3rem] shadow-xl shadow-stone-200/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-250">
            <thead>
              <tr className="border-b border-stone-50 bg-stone-50/30 text-stone-400 font-black italic">
                <th className="px-10 py-8 text-[9px] uppercase tracking-[0.4em]">Client</th>
                <th className="px-10 py-8 text-[9px] uppercase tracking-[0.4em]">Acquisitions</th>
                <th className="px-10 py-8 text-[9px] uppercase tracking-[0.4em]">Investment</th>
                <th className="px-10 py-8 text-[9px] uppercase tracking-[0.4em]">Last Acquisition</th>
                <th className="px-10 py-8 text-[9px] uppercase tracking-[0.4em] pr-16">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {customers.map((client) => (
                <tr key={client._id} className="group hover:bg-stone-50/50 transition-colors">
                  <td className="px-10 py-8 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-stone-900 flex items-center justify-center text-white shadow-inner">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-stone-900">{client.firstName} {client.lastName}</p>
                        <p className="text-[10px] text-stone-400 flex items-center gap-1.5 lowercase">
                          <Mail size={10} /> {client.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-10 py-8 whitespace-nowrap">
                     <div className="flex items-center gap-2">
                       <Package size={12} className="text-stone-300" />
                       <span className="text-sm font-medium text-stone-800">{client.acquisitionCount} Pieces</span>
                     </div>
                  </td>

                  <td className="px-10 py-8 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <DollarSign size={12} className="text-stone-300" />
                      <span className="text-sm font-black text-stone-900">
                        {client.totalInvestment.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </td>

                  <td className="px-10 py-8 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-[11px] text-stone-500 font-serif italic">
                      <Calendar size={12} className="text-stone-300" />
                      {client.lastAcquisition ? new Date(client.lastAcquisition).toLocaleDateString() : "None Recorded"}
                    </div>
                  </td>

                  <td className="px-10 py-8 whitespace-nowrap pr-16">
                    <div className="flex items-center gap-2">
                      <Clock size={12} className={client.lastLogin ? "text-emerald-500" : "text-stone-200"} />
                      <span className="text-[11px] font-medium text-stone-600 uppercase tracking-widest">
                        {client.lastLogin 
                          ? new Date(client.lastLogin).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) 
                          : "Never"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}