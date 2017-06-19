export default {
  Hoy: {
    startDate: now => {
      return now;
    },
    endDate: now => {
      return now;
    }
  },
  Ayer: {
    startDate: now => {
      return now.add(-1, "days");
    },
    endDate: now => {
      return now.add(-1, "days");
    }
  },
  "Últimos 7 días": {
    startDate: now => {
      return now.add(-7, "days");
    },
    endDate: now => {
      return now;
    }
  },
  "Últimos 30 días": {
    startDate: now => {
      return now.add(-30, "days");
    },
    endDate: now => {
      return now;
    }
  }
};
