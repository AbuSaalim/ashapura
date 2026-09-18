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
    tagline: "Ultra Luxury High-Rise Residential",
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
    tagline: "Boutique Living & Contemporary Amenities",
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
    tagline: "Green Suburban Gated Community",
    location: "Palghar, Mumbai Suburban",
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
    tagline: "Delivered Low-Rise Residential",
    location: "Goregaon West, Mumbai",
    address: "Jawahar Nagar, Goregaon (W), Mumbai",
    type: "BOUTIQUE_RESIDENTIAL",
    status: "COMPLETED",
    totalFloors: 7,
    unitsPerFloor: 4,
    wings: ["Wing A"],
    baseRate: 19000,
    isRedevelopment: true,
    saleableFlatsCount: 29,
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

  // Generate Amar CHSL (Society Redevelopment Model)
  const amar = mockProjects[0];
  const rehabMembers = [
    "Mr. Ramesh Joshi (Old Flat 101)", "Smt. Nalini Desai (Old Flat 102)",
    "Mr. Prakash Shah (Old Flat 201)", "Mr. Kirit Mehta (Old Flat 202)",
    "Dr. Arvind Kulkarni (Old Flat 301)", "Smt. Rekha Patel (Old Flat 302)",
    "Mr. Deepak Trivedi (Old Flat 401)", "Mr. Suresh Singhania (Old Flat 402)",
    "Mr. Ashok Somani (Old Flat 501)", "Smt. Bharti Vora (Old Flat 502)",
    "Mr. Nilesh Parekh (Old Flat 601)", "Mr. Viren Chhabria (Old Flat 602)",
    "Smt. Alka Zaveri (Old Flat 701)", "Mr. Bhavesh Shah (Old Flat 702)",
    "Mr. Jatin Kothari (Old Flat 801)", "Mr. Chetan Gandhi (Old Flat 802)",
    "Smt. Geeta Bhatt (Old Flat 901)", "Mr. Mahendra Jain (Old Flat 902)",
    "Mr. Hitesh Dalal (Old Flat 1001)", "Smt. Mona Agarwal (Old Flat 1002)"
  ];

  for (let floor = 1; floor <= amar.totalFloors; floor++) {
    for (let u = 1; u <= amar.unitsPerFloor; u++) {
      const unitNumber = `${floor}${u.toString().padStart(2, '0')}`;
      const is2BHK = u % 2 === 0;

      // Floors 1-5 are Society Rehab Quota (Tie-up)
      let quota: UnitQuota = "BUILDER_SALE";
      let status: UnitStatus = "AVAILABLE";
      let memberName: string | undefined = undefined;
      let investorName: string | undefined = undefined;
      let customerName: string | undefined = undefined;

      const flatIndex = (floor - 1) * 4 + (u - 1);
      if (flatIndex < 20) {
        quota = "SOCIETY_REHAB";
        status = "SOCIETY_REHAB";
        memberName = rehabMembers[flatIndex] || `Society Member ${unitNumber}`;
      } else if (floor >= 11 && u >= 3) {
        quota = "INVESTOR_SHARE";
        status = "INVESTOR_HOLD";
        investorName = "Apex Capital Partners JV";
      } else {
        quota = "BUILDER_SALE";
        if (floor === 8 && u === 1) {
          status = "BOOKED";
          customerName = "Vikram Aditya (Adv. High Court)";
        } else if (floor === 9 && u === 2) {
          status = "HOLD";
          customerName = "Prashant Singhal (Token Paid)";
        } else if (floor === 7 && u === 4) {
          status = "BOOKED";
          customerName = "Sunita Rao";
        }
      }

      flats.push({
        id: `amar-${unitNumber}`,
        projectId: amar.id,
        projectName: amar.name,
        wing: "Tower 1",
        floor,
        unitNumber,
        type: is2BHK ? "2BHK" : "1BHK",
        carpetArea: is2BHK ? 720 : 490,
        baseRate: amar.baseRate,
        quota,
        status,
        societyMemberName: memberName,
        investorName,
        customerName,
      });
    }
  }

  // Generate Meghmala Crysta (Malad West High-Rise)
  const meghmala = mockProjects[1];
  meghmala.wings.forEach(wing => {
    for (let floor = 1; floor <= meghmala.totalFloors; floor++) {
      for (let u = 1; u <= meghmala.unitsPerFloor; u++) {
        const unitNumber = `${floor}${u.toString().padStart(2, '0')}`;
        const is3BHK = u === 5;
        const is2BHK = u % 2 === 0;

        let quota: UnitQuota = "BUILDER_SALE";
        let status: UnitStatus = "AVAILABLE";
        let customerName: string | undefined = undefined;
        let investorName: string | undefined = undefined;

        if (wing === "Wing B" && floor >= 14 && u >= 4) {
          quota = "INVESTOR_SHARE";
          status = "INVESTOR_HOLD";
          investorName = "Jay Gagan Promoters Holding";
        } else if ((floor * 3 + u) % 7 === 0) {
          status = "BOOKED";
          customerName = `Client ${wing}-${unitNumber}`;
        } else if ((floor * 5 + u) % 11 === 0) {
          status = "HOLD";
          customerName = `Token Advance (${wing}-${unitNumber})`;
        }

        flats.push({
          id: `megh-${wing.replace(/\s+/g, '')}-${unitNumber}`,
          projectId: meghmala.id,
          projectName: meghmala.name,
          wing,
          floor,
          unitNumber,
          type: is3BHK ? "3BHK" : (is2BHK ? "2BHK" : "1BHK"),
          carpetArea: is3BHK ? 1050 : (is2BHK ? 760 : 510),
          baseRate: meghmala.baseRate,
          quota,
          status,
          customerName,
          investorName,
        });
      }
    }
  });

  // Generate Navkar Heritage (Goregaon West)
  const navkar = mockProjects[2];
  for (let floor = 1; floor <= navkar.totalFloors; floor++) {
    for (let u = 1; u <= navkar.unitsPerFloor; u++) {
      const unitNumber = `${floor}${u.toString().padStart(2, '0')}`;
      const is2BHK = u >= 2;
      let status: UnitStatus = (floor === 3 && u === 1) || (floor === 7 && u === 2) ? "BOOKED" : (floor === 5 ? "HOLD" : "AVAILABLE");
      
      flats.push({
        id: `navkar-${unitNumber}`,
        projectId: navkar.id,
        projectName: navkar.name,
        wing: "Wing A",
        floor,
        unitNumber,
        type: is2BHK ? "2BHK" : "1BHK",
        carpetArea: is2BHK ? 780 : 540,
        baseRate: navkar.baseRate,
        quota: "BUILDER_SALE",
        status,
        customerName: status === "BOOKED" ? `Owner ${unitNumber}` : undefined,
      });
    }
  }

  // Generate Aloha Township (Palghar)
  const aloha = mockProjects[4];
  aloha.wings.forEach(phase => {
    for (let floor = 1; floor <= aloha.totalFloors; floor++) {
      for (let u = 1; u <= aloha.unitsPerFloor; u++) {
        const unitNumber = `${floor}${u.toString().padStart(2, '0')}`;
        const is2BHK = u % 2 === 0;
        let status: UnitStatus = (floor === 2 && u === 3) || (floor === 4 && u === 1) ? "BOOKED" : "AVAILABLE";

        flats.push({
          id: `aloha-${phase.replace(/\s+/g, '')}-${unitNumber}`,
          projectId: aloha.id,
          projectName: aloha.name,
          wing: phase,
          floor,
          unitNumber,
          type: is2BHK ? "2BHK" : "1BHK",
          carpetArea: is2BHK ? 650 : 420,
          baseRate: aloha.baseRate,
          quota: "BUILDER_SALE",
          status,
          customerName: status === "BOOKED" ? `Allottee ${unitNumber}` : undefined,
        });
      }
    }
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
];
