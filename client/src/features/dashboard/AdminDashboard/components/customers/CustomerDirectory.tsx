import { useState, useEffect } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { User, Mail, DollarSign, Package, Calendar } from "lucide-react";

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  totalInvestment: number;
  acquisitionCount: number;
  lastAcquisition: string | null;
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
    <div className="p-32 text-center font-serif italic text-stone-400 animate-pulse tracking-widest">
      Consulting the Client Archive...
    </div>
  );

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end px-2">
        <div>
          <h2 className="text-2xl font-serif text-stone-900 italic">Client Directory</h2>
          <p className="text-sm text-stone-500 font-light">Managing brand relationships and investment history.</p>
        </div>
        <div className="bg-white border border-stone-100 px-6 py-3 rounded-2xl shadow-sm border-b-2 border-b-stone-900/5">
           <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Registry: {customers.length} Clients</p>
        </div>
      </header>

      <div className="bg-white border border-stone-100 rounded-[2.5rem] overflow-hidden shadow-xl shadow-stone-200/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-50 bg-stone-50/30">
              {["Client", "Acquisitions", "Total Investment", "Last Active"].map((h) => (
                <th key={h} className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] text-stone-400 font-black">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {customers.map((client) => (
              <tr key={client._id} className="group hover:bg-stone-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 group-hover:bg-stone-900 group-hover:text-white transition-colors">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-stone-900">{client.firstName} {client.lastName}</p>
                      <p className="text-[10px] text-stone-400 flex items-center gap-1">
                        <Mail size={10} /> {client.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                   <div className="flex items-center gap-1.5">
                     <Package size={12} className="text-stone-300" />
                     <span className="text-sm font-medium text-stone-800">{client.acquisitionCount} Pieces</span>
                   </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-1">
                    <DollarSign size={12} className="text-stone-300" />
                    <span className="text-sm font-black text-stone-900">
                      {client.totalInvestment.toLocaleString(undefined, { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                      })}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-serif italic">
                    <Calendar size={12} className="text-stone-300" />
                    {client.lastAcquisition 
                      ? new Date(client.lastAcquisition).toLocaleDateString(undefined, { 
                          month: "short", 
                          day: "numeric", 
                          year: "numeric" 
                        })
                      : "No activity"}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}