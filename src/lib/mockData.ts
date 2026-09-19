export type UnitQuota = "BUILDER_SALE" | "SOCIETY_REHAB" | "INVESTOR_SHARE";
export type UnitStatus = "AVAILABLE" | "HOLD" | "BOOKED" | "SOCIETY_REHAB" | "INVESTOR_HOLD";
export type ProjectType = "HIGH_RISE" | "REDEVELOPMENT_CHSL" | "BOUTIQUE_RESIDENTIAL" | "TOWNSHIP";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  location: string;
  address: string;
  type: ProjectType;
  status: "ONGOING" | "COMPLETED" | "UPCOMING";
  reraId?: string;
  totalFloors: number;
  unitsPerFloor: number;
  wings: string[];
  baseRate: number; // in ₹/sqft
  isRedevelopment: boolean;
  societyName?: string;
  rehabFlatsCount?: number;
  saleableFlatsCount?: number;
  investorFlatsCount?: number;
}

export const mockProjects: Project[] = [
  {
    id: "proj-amar-chsl",
    name: "Amar CHSL (Redevelopment)",
    tagline: "Society Redevelopment Tie-up Project",
    location: "Goregaon West, Mumbai",
    address: "Jawahar Nagar, Near S.V. Road, Goregaon (W), Mumbai - 400104",
    type: "REDEVELOPMENT_CHSL",
    status: "ONGOING",
    reraId: "P51800041280",
    totalFloors: 12,
    unitsPerFloor: 4,
    wings: ["Tower 1"],
    baseRate: 21500,
    isRedevelopment: true,
    societyName: "Amar Co-Operative Housing Society Ltd.",
    rehabFlatsCount: 20,
    saleableFlatsCount: 22,
    investorFlatsCount: 6,
  },
  {
    id: "proj-meghmala",
    name: "Meghmala Crysta",
    tagline: "Ultra Luxury High-Rise (72,000 sq.ft)",
    location: "Malad West, Mumbai",
    address: "Liberty Garden, Road No 3, Malad (W), Mumbai - 400064",
    type: "HIGH_RISE",
    status: "ONGOING",
    reraId: "P51800034291",
    totalFloors: 15,
    unitsPerFloor: 5,
    wings: ["Wing A", "Wing B"],
    baseRate: 23500,
    isRedevelopment: false,
    saleableFlatsCount: 135,
    investorFlatsCount: 15,
  },
  {
    id: "proj-navkar",
    name: "Navkar Heritage",
    tagline: "Boutique Living & Contemporary Amenities (29,000 sq.ft)",
    location: "Goregaon West, Mumbai",
    address: "Jawahar Nagar, Goregaon (W), Mumbai - 400104",
    type: "BOUTIQUE_RESIDENTIAL",
    status: "ONGOING",
    reraId: "P51800038821",
    totalFloors: 14,
    unitsPerFloor: 3,
    wings: ["Wing A"],
    baseRate: 22000,
    isRedevelopment: false,
    saleableFlatsCount: 38,
    investorFlatsCount: 4,
  },
  {
    id: "proj-bhagywan",
    name: "Bhagywan Primrose",
    tagline: "Fast-Track Residential Towers",
    location: "Bhandup East, Mumbai",
    address: "LBS Marg, Near Railway Station, Bhandup (E), Mumbai - 400042",
    type: "HIGH_RISE",
    status: "ONGOING",
    reraId: "P51800048138",
    totalFloors: 16,
    unitsPerFloor: 4,
    wings: ["Wing A", "Wing B"],
    baseRate: 16500,
    isRedevelopment: false,
    saleableFlatsCount: 115,
    investorFlatsCount: 13,
  },
  {
    id: "proj-aloha",
    name: "Aloha Township",
    tagline: "Suburban Integrated Gated Township (3.5 Lac sq.ft)",
    location: "Palghar West, Mumbai Suburban",
    address: "Mahim Road, Near Railway Station, Palghar - 401404",
    type: "TOWNSHIP",
    status: "ONGOING",
    reraId: "P9900046448",
    totalFloors: 7,
    unitsPerFloor: 6,
    wings: ["Phase 1", "Phase 2"],
    baseRate: 5800,
    isRedevelopment: false,
    saleableFlatsCount: 78,
    investorFlatsCount: 6,
  },
  {
    id: "proj-ronak-villa",
    name: "Ronak Villa",
    tagline: "Delivered Low-Rise Residential (21,000 sq.ft with OC)",
    location: "Goregaon West, Mumbai",
    address: "Jawahar Nagar, Goregaon (W), Mumbai - 400104",
    type: "BOUTIQUE_RESIDENTIAL",
    status: "COMPLETED",
    totalFloors: 7,
    unitsPerFloor: 4,
    wings: ["Wing A"],
    baseRate: 19500,
    isRedevelopment: true,
    societyName: "Ronak Villa CHSL",
    rehabFlatsCount: 12,
    saleableFlatsCount: 17,
  },
  {
    id: "proj-jaygagan",
    name: "Jay Gagan (Corporate HO)",
    tagline: "Delivered Landmark (22,000 sq.ft)",
    location: "Malad West, Mumbai",
    address: "101 Jay Gagan, Nr. Liberty Garden, Road No. 3, Malad (W), Mumbai - 400104",
    type: "BOUTIQUE_RESIDENTIAL",
    status: "COMPLETED",
    totalFloors: 8,
    unitsPerFloor: 3,
    wings: ["Tower 1"],
    baseRate: 22500,
    isRedevelopment: false,
    saleableFlatsCount: 24,
  },
  {
    id: "proj-nishad-chsl",
    name: "Nishad CHSL (Redevelopment)",
    tagline: "Upcoming Prime Society Redevelopment",
    location: "Goregaon West, Mumbai",
    address: "Near S.V. Road & Station, Goregaon (W), Mumbai - 400104",
    type: "REDEVELOPMENT_CHSL",
    status: "UPCOMING",
    reraId: "P51800045920",
    totalFloors: 14,
    unitsPerFloor: 4,
    wings: ["Wing A"],
    baseRate: 21000,
    isRedevelopment: true,
    societyName: "Nishad Co-Operative Housing Society Ltd.",
    rehabFlatsCount: 24,
    saleableFlatsCount: 28,
    investorFlatsCount: 4,
  },
  {
    id: "proj-diyana-villa",
    name: "Diyana Villa",
    tagline: "Boutique 1 & 2 BHK Luxury Duplexes",
    location: "Goregaon West, Mumbai",
    address: "Jawahar Nagar, Goregaon (W), Mumbai - 400104",
    type: "BOUTIQUE_RESIDENTIAL",
    status: "ONGOING",
    reraId: "P51800039910",
    totalFloors: 9,
    unitsPerFloor: 3,
    wings: ["Wing A"],
    baseRate: 20500,
    isRedevelopment: false,
    saleableFlatsCount: 24,
    investorFlatsCount: 3,
  },
  {
    id: "proj-riddhi-tower",
    name: "Riddhi Tower",
    tagline: "High-Rise Luxury Residential (Thane Division)",
    location: "Thane West, Mumbai MMR",
    address: "Panchpakhadi, Near Teen Hath Naka, Thane (W) - 400602",
    type: "HIGH_RISE",
    status: "ONGOING",
    reraId: "P51700031852",
    totalFloors: 18,
    unitsPerFloor: 4,
    wings: ["Wing A", "Wing B"],
    baseRate: 14200,
    isRedevelopment: false,
    saleableFlatsCount: 130,
    investorFlatsCount: 14,
  }
];

export interface Flat {
  id: string;
  projectId: string;
  projectName: string;
  wing: string;
  floor: number;
  unitNumber: string;
  type: string; // "1BHK" | "2BHK" | "3BHK"
  carpetArea: number;
  baseRate: number;
  quota: UnitQuota;
  status: UnitStatus;
  customerName?: string;
  societyMemberName?: string; // For society redevelopment rehab allottees
  investorName?: string;
}

const generateAllInventory = (): Flat[] => {
  const flats: Flat[] = [];

  const rehabNames = [
    "Mr. Ramesh Joshi", "Smt. Nalini Desai", "Mr. Prakash Shah", "Mr. Kirit Mehta",
    "Dr. Arvind Kulkarni", "Smt. Rekha Patel", "Mr. Deepak Trivedi", "Mr. Suresh Singhania",
    "Mr. Ashok Somani", "Smt. Bharti Vora", "Mr. Nilesh Parekh", "Mr. Viren Chhabria",
    "Smt. Alka Zaveri", "Mr. Bhavesh Shah", "Mr. Jatin Kothari", "Mr. Chetan Gandhi",
    "Smt. Geeta Bhatt", "Mr. Mahendra Jain", "Mr. Hitesh Dalal", "Smt. Mona Agarwal",
    "Mr. Rajesh Panchal", "Mrs. Sudha Hegde", "Mr. Dilip Maniar", "Smt. Sarojini Iyer"
  ];

  mockProjects.forEach((project) => {
    project.wings.forEach((wing) => {
      for (let floor = 1; floor <= project.totalFloors; floor++) {
        for (let u = 1; u <= project.unitsPerFloor; u++) {
          const unitNumber = `${floor}${u.toString().padStart(2, '0')}`;
          const is3BHK = project.unitsPerFloor >= 4 && u === project.unitsPerFloor;
          const is2BHK = u % 2 === 0;

          let quota: UnitQuota = "BUILDER_SALE";
          let status: UnitStatus = "AVAILABLE";
          let memberName: string | undefined = undefined;
          let investorName: string | undefined = undefined;
          let customerName: string | undefined = undefined;

          if (project.isRedevelopment) {
            const flatIndex = (floor - 1) * project.unitsPerFloor + (u - 1);
            if (flatIndex < (project.rehabFlatsCount || 16)) {
              quota = "SOCIETY_REHAB";
              status = "SOCIETY_REHAB";
              memberName = `${rehabNames[flatIndex % rehabNames.length]} (Old Flat ${100 + flatIndex + 1})`;
            } else if (floor === project.totalFloors && u >= 2) {
              quota = "INVESTOR_SHARE";
              status = "INVESTOR_HOLD";
              investorName = "Apex Capital Partners JV";
            } else if ((floor + u) % 4 === 0) {
              status = "BOOKED";
              customerName = `Buyer ${unitNumber}`;
            } else if ((floor + u) % 5 === 0) {
              status = "HOLD";
              customerName = `Token Advance (${unitNumber})`;
            }
          } else {
            if (project.status === "COMPLETED") {
              status = "BOOKED";
              customerName = `Resident Allottee ${unitNumber}`;
            } else {
              if (floor === project.totalFloors && u === project.unitsPerFloor) {
                quota = "INVESTOR_SHARE";
                status = "INVESTOR_HOLD";
                investorName = "Promoters JV Holding";
              } else if ((floor * 3 + u) % 5 === 0) {
                status = "BOOKED";
                customerName = `Client ${wing}-${unitNumber}`;
              } else if ((floor * 2 + u) % 7 === 0) {
                status = "HOLD";
                customerName = `Token Advance (${wing}-${unitNumber})`;
              }
            }
          }

          flats.push({
            id: `${project.id}-${wing.replace(/\s+/g, '')}-${unitNumber}`,
            projectId: project.id,
            projectName: project.name,
            wing,
            floor,
            unitNumber,
            type: is3BHK ? "3BHK" : (is2BHK ? "2BHK" : "1BHK"),
            carpetArea: is3BHK ? 1080 : (is2BHK ? 740 : 485),
            baseRate: project.baseRate,
            quota,
            status,
            customerName,
            societyMemberName: memberName,
            investorName,
          });
        }
      }
    });
  });

  return flats;
};

export const mockInventory: Flat[] = generateAllInventory();

export interface Lead {
  id: string;
  name: string;
  phone: string;
  preferredProject: string;
  preferredConfig: string;
  budget: string;
  source: string;
  status: "NEW" | "CONTACTED" | "VISIT_PLANNED" | "NEGOTIATION" | "BOOKED" | "LOST";
  date: string;
}

export const mockLeads: Lead[] = [
  { id: "L001", name: "Rajesh Patel", phone: "+91 9876543210", preferredProject: "Meghmala Crysta (Malad W)", preferredConfig: "2 BHK", budget: "1.85 Cr", source: "Meta Ads", status: "NEW", date: new Date().toISOString() },
  { id: "L002", name: "Sneha Sharma", phone: "+91 9876543211", preferredProject: "Amar CHSL (Goregaon W)", preferredConfig: "2 BHK", budget: "1.55 Cr", source: "Website", status: "CONTACTED", date: new Date(Date.now() - 86400000).toISOString() },
  { id: "L003", name: "Amit Kumar", phone: "+91 9876543212", preferredProject: "Bhagywan Primrose (Bhandup)", preferredConfig: "1 BHK", budget: "95 Lacs", source: "99acres", status: "VISIT_PLANNED", date: new Date(Date.now() - 172800000).toISOString() },
  { id: "L004", name: "Priya Singh", phone: "+91 9876543213", preferredProject: "Navkar Heritage (Goregaon W)", preferredConfig: "2 BHK", budget: "1.7 Cr", source: "Walk-in Malad HO", status: "NEGOTIATION", date: new Date(Date.now() - 259200000).toISOString() },
  { id: "L005", name: "Vikas Jain", phone: "+91 9876543214", preferredProject: "Aloha (Palghar)", preferredConfig: "1 BHK", budget: "32 Lacs", source: "Meta Ads", status: "BOOKED", date: new Date(Date.now() - 345600000).toISOString() },
  { id: "L006", name: "Kavita Shah", phone: "+91 9820123456", preferredProject: "Diyana Villa (Goregaon W)", preferredConfig: "2 BHK Duplex", budget: "1.9 Cr", source: "Channel Partner", status: "CONTACTED", date: new Date(Date.now() - 120000000).toISOString() },
  { id: "L007", name: "Nitin Sawant", phone: "+91 9833445566", preferredProject: "Riddhi Tower (Thane W)", preferredConfig: "3 BHK", budget: "1.45 Cr", source: "MagicBricks", status: "VISIT_PLANNED", date: new Date(Date.now() - 43200000).toISOString() },
  { id: "L008", name: "Girish Kulkarni", phone: "+91 9819876543", preferredProject: "Nishad CHSL (Goregaon W)", preferredConfig: "2 BHK", budget: "1.6 Cr", source: "Walk-in Malad HO", status: "NEW", date: new Date().toISOString() },
];

export interface Demand {
  id: string;
  projectId: string;
  projectName: string;
  flatNo: string;
  customerName: string;
  milestone: string;
  amount: number;
  dueDate: string;
  type: "CUSTOMER_MILESTONE" | "SOCIETY_CORPUS" | "RENT_DISBURSAL";
  status: "PENDING" | "PAID" | "OVERDUE";
}

export const mockDemands: Demand[] = [
  { id: "D001", projectId: "proj-meghmala", projectName: "Meghmala Crysta", flatNo: "Wing A-402", customerName: "Rahul Sharma", milestone: "3rd Slab Casting (MahaRERA 35%)", amount: 1250000, dueDate: new Date(Date.now() + 86400000 * 5).toISOString(), type: "CUSTOMER_MILESTONE", status: "PENDING" },
  { id: "D002", projectId: "proj-amar-chsl", projectName: "Amar CHSL (Redev)", flatNo: "Rehab Allottees", customerName: "Amar CHSL Society Corpus Fund", milestone: "Displacement Hardship Allowance (Q2)", amount: 1800000, dueDate: new Date(Date.now() - 86400000 * 2).toISOString(), type: "SOCIETY_CORPUS", status: "OVERDUE" },
  { id: "D003", projectId: "proj-amar-chsl", projectName: "Amar CHSL (Redev)", flatNo: "Tower 1-801", customerName: "Vikram Aditya", milestone: "Plinth Completion Milestone", amount: 1500000, dueDate: new Date(Date.now() - 86400000 * 10).toISOString(), type: "CUSTOMER_MILESTONE", status: "PAID" },
  { id: "D004", projectId: "proj-bhagywan", projectName: "Bhagywan Primrose", flatNo: "Wing B-105", customerName: "Anita Desai", milestone: "Booking Agreement Execution", amount: 850000, dueDate: new Date(Date.now() + 86400000 * 3).toISOString(), type: "CUSTOMER_MILESTONE", status: "PENDING" },
  { id: "D005", projectId: "proj-riddhi-tower", projectName: "Riddhi Tower", flatNo: "Wing A-703", customerName: "Sunil Shinde", milestone: "5th Slab Casting Demand", amount: 980000, dueDate: new Date(Date.now() + 86400000 * 7).toISOString(), type: "CUSTOMER_MILESTONE", status: "PENDING" },
  { id: "D006", projectId: "proj-diyana-villa", projectName: "Diyana Villa", flatNo: "Wing A-301", customerName: "Ketan Parekh", milestone: "Plinth Level Completion", amount: 1400000, dueDate: new Date(Date.now() - 86400000 * 4).toISOString(), type: "CUSTOMER_MILESTONE", status: "OVERDUE" },
];
